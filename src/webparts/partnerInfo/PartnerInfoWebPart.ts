import { escape } from '@microsoft/sp-lodash-subset';

import {
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './PartnerInfoWebPart.module.scss';
import * as strings from 'PartnerInfoWebPartStrings';
import { IPartnerInfoWebPartProps } from './IPartnerInfoWebPartProps';
import MockHttpClient from './MockHttpClient';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export interface IPartnerInfoWebPartProps {
  listName: string;
}

export interface IPartners {
  value: IPartner[];
}

export interface PartnerContactProfile {
  Title: string;
  EMail: string;
  WorkPhone: string;
}

export interface PartnerContact {
  FullName: string;
  Email: string;
  WorkPhone: string;
}


export interface PartnerLogo {
  Description: string;
  Url: string;
}

export interface Program {
  Title: string;
}


export interface IPartner {
  BusinessDevelopmentExecutivePers: PartnerContactProfile;
  BusinessDevelopmentManagerContac: PartnerContact;
  ProgramEngagementManagerPerson: PartnerContactProfile;
  ProgramParticipation: Program[];
  ProgramEngagementManagerContact: PartnerContact;
  Title: string;
  PartnerType: string;
  Logo: PartnerLogo;
  PartnershipStartDate: string;
  PartnershipRenewalDate: string;
  WorkAddress : string;
}

export default class PartnerInfoWebPart extends BaseClientSideWebPart<IPartnerInfoWebPartProps> {

  private formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? "" : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }
  private formatEmail(s) {
    return (!s) ? "" : s;
  }

  private formatDate(s)
  {     
     var d = new Date(s);
     return (d.getMonth() + 1) + "/" + d.getDay() + "/" + d.getFullYear();
  }

  private _renderPartners(items: IPartner[]): void {
    let html: string = '';

    let item = items[0];  //only display a single/first record

     html += `<div class="${ styles.row}">`;

    if (item.Logo != null ) {
    html += `
    <div class="${styles.column}">
     <img class="${ styles.img}" src=${item.Logo.Url} >
    </div>`;
  } else {
    html += `    
      <div class="${ styles.logoTitle} ${styles.column}"> 
      ${item.Title}
    </div>`;
  }

     
html += `
<div class="${ styles.programs}">
 <div>
  <div class="${ styles.title}">Participant in: 
  <span class="${ styles.subTitle}"> ${item.ProgramParticipation.map((element) => {
        return element.Title;
      }).toString()}</span> </div>
   </div>
</div>
</div>


<div class="${ styles.row}">

<div class="${ styles.column}">
<ul>
<li class="${ styles.title}">${item.WorkAddress}</li>
</ul>
</div>

</div>

<div class="${ styles.row}">
<div class="${ styles.column}">
<ul>
<li class="${ styles.title}">Partnership Start:</li>
<li class="${ styles.subTitle}">${ this.formatDate( item.PartnershipStartDate)}
 </li>
</ul>
</div>
<div class="${ styles.column}">
<ul>
<li class="${ styles.title}">Partnership Renewal:</li> 
<li class="${ styles.subTitle}">${ this.formatDate( item.PartnershipRenewalDate)}</li>
</ul>
</div>
</div>




<div class="${ styles.row}">

<div class="${ styles.column}">
<ul >
<li  class="${ styles.title}">Partnership Relationship Manager</li>
  <li class="${ styles.subTitle}"> ${ item.BusinessDevelopmentManagerContac.FullName} </li>
  <li class="${ styles.subTitle}"> ${ this.formatEmail( item.BusinessDevelopmentManagerContac.Email)}</li>
  <li class="${ styles.subTitle}"> ${ this.formatPhoneNumber( item.BusinessDevelopmentManagerContac.WorkPhone)}</li>
</ul>
  </div>
  
   <div class="${ styles.column}">
    <ul >
     <li class="${ styles.title}">Partner Engagement Manager</li>
     <li class="${ styles.subTitle}"> ${item.ProgramEngagementManagerContact.FullName}</li>
     <li class="${ styles.subTitle}"> ${ this.formatEmail( item.ProgramEngagementManagerContact.Email)}</li>
     <li class="${ styles.subTitle}"> ${ this.formatPhoneNumber( item.ProgramEngagementManagerContact.WorkPhone)}</li>
    </ul>
     </div>


   </div>`;


    const listContainer: Element = this.domElement.querySelector('#spPartnersContainer');
    listContainer.innerHTML = html;

  }

  private _getMockPartnersData(): Promise<IPartners> {
    return MockHttpClient.get()
      .then((data: IPartner[]) => {
        var partnersData: IPartners = { value: data };
        return partnersData;
      }) as Promise<IPartners>;
  }


  private _getPartnersData(): Promise<IPartners> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/GetByTitle('${this.properties.listName}')/items?$select=Title,Logo,PartnerType,PartnershipStartDate,PartnershipRenewalDate,WorkAddress,
      BusinessDevelopmentExecutivePers/Title,BusinessDevelopmentExecutivePers/EMail,BusinessDevelopmentExecutivePers/WorkPhone,   
      ProgramEngagementManagerPerson/Title,ProgramEngagementManagerPerson/EMail,ProgramEngagementManagerPerson/WorkPhone,
    BusinessDevelopmentManagerContac/FullName,BusinessDevelopmentManagerContac/Email,BusinessDevelopmentManagerContac/WorkPhone,
    ProgramEngagementManagerContact/FullName,ProgramEngagementManagerContact/Email,ProgramEngagementManagerContact/WorkPhone,
    ProgramParticipation/Title
    &$expand=BusinessDevelopmentExecutivePers
    &$expand=ProgramEngagementManagerPerson
    &$expand=BusinessDevelopmentManagerContac
    &$expand=ProgramEngagementManagerContact
    &$expand=ProgramParticipation`, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }) as Promise<IPartners>;
  }


  private _renderPartnersAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockPartnersData().then((response) => {
        this._renderPartners(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getPartnersData().then((response) => {
        this._renderPartners(response.value);
      });
    }
  }



  public render(): void {

    this.domElement.innerHTML = `
      <div class="${ styles.partnerInfo}">
        <div class="${ styles.container}">        
        <div id="spPartnersContainer"></div>
        <div class="status"></div>
        </div>
      </div>`;

    this.updateStatus(this.listNotConfigured() ? 'Please configure list in Web Part properties' : '');


    this._renderPartnersAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  private listNotConfigured(): boolean {
    return this.properties.listName === undefined ||
      this.properties.listName === null ||
      this.properties.listName.length === 0;
  }

  private updateStatus(status: string): void {
    this.domElement.querySelector('.status').innerHTML = status;
  }

}

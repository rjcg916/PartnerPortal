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


import styles from './DiscussionsInfoWebPart.module.scss';
import * as strings from 'DiscussionsInfoWebPartStrings';

export interface IDiscussion {
  Id: number;
  ID: number;
  Title: string;
  Body: string;
  ParentItemID: number;
  Modified: string;
  Created: string;
}

export interface IDiscussions {
  value: IDiscussion[];
}

import MockHttpClient from './MockHttpClient';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';


export interface IDiscussionsInfoWebPartProps {
  description: string;
  listName: string;
  topicPath: string;
}
export default class DiscussionsInfoWebPart extends BaseClientSideWebPart<IDiscussionsInfoWebPartProps> {


  private _renderDiscussions(items: IDiscussion[]): void {


    //sort discussions so most recent entries are first 

    items.sort((a, b) => {
      if (a.Id> b.Id) {
        return -1;
      }
      if (a.Id < b.Id) {
        return 1;
      }
      return 0;
    });

    let html: string = '';

    for (var i = 0; i < items.length; i++) {

      if (items[i].ParentItemID == null) {

        //build a snippet containing up to 2 replies
        let htmlSub: string = '';
        var maxEntries = (items.length < 2) ? items.length: 2;

        for (var j = 0; j < maxEntries; j++) {
          if (items[j].ParentItemID == items[i].Id) {
            htmlSub += `<li class="${styles.description}">` + items[j].Body.toString() + `</li>`;
          }
        }

        
        html += `<div class="${styles.row}">
          <div class=" ${styles.column}">
            <div class="${styles.title}">` + items[i].Title + `</div>
            <div class="${styles.description} ${styles.topic}">` + items[i].Body.toString() + `</div>
          </div>
          <div class="${styles.column}">
          <ul>` + htmlSub + `</ul>
            <a class="${styles.button}" href="${this.context.pageContext.web.absoluteUrl}/Lists/${this.properties.listName}/AllItems.aspx?RootFolder=${this.context.pageContext.web.serverRelativeUrl}/Lists/${this.properties.listName}/${items[i].Title}">Join the discussion</a>
          </div>
          </div>`;

      }
    }



    const listContainer: Element = this.domElement.querySelector('#spDiscussionsContainer');
    listContainer.innerHTML = html;

  }


  private _getMockDiscussionsData(): Promise<IDiscussions> {
    return MockHttpClient.get()
      .then((data: IDiscussion[]) => {
        var discussionsData: IDiscussions = { value: data };
        return discussionsData;
      }) as Promise<IDiscussions>;
  }


  private _getDiscussionsData(): Promise<IDiscussions> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/GetByTitle('${this.properties.listName}')/items?$select=Id,Title,Body,ParentItemID,Created,Modified`, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }) as Promise<IDiscussions>;
  }

  private _renderDiscussionsAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockDiscussionsData().then((response) => {
        this._renderDiscussions(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getDiscussionsData().then((response) => {
        this._renderDiscussions(response.value);
      });
    }
  }


  public render(): void {

    this.domElement.innerHTML = `
        <div class="${ styles.discussionsInfo}">
          <div class="${ styles.container}">        
          <div id="spDiscussionsContainer"></div>
          <div class="status"></div>
          </div>
        </div>`;

    this.updateStatus(this.listNotConfigured() ? 'Please configure list in Web Part properties' : '');


    this._renderDiscussionsAsync();
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

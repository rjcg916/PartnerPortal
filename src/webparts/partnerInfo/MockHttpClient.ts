//import { ISPList } from './PartnerInfoWebPart';
import { IPartner } from './PartnerInfoWebPart';

export default class MockHttpClient {


    private static _items: IPartner[] = [

        {

            "BusinessDevelopmentExecutivePers": {
                "Title": "Robert Graham",
                "EMail": "admin@rjg.onmicrosoft.com",
                "WorkPhone": "4153086294"
            },
            "BusinessDevelopmentManagerContac": {
                "FullName": "Jane Smith",
                "Email": "janes@anitab.org",
                "WorkPhone": "(650) 310-3420"
            },
            "ProgramEngagementManagerPerson": {
                "Title": "user",
                "EMail": "user1@rjg.onmicrosoft.com",
                "WorkPhone": null
            },
            "ProgramParticipation": [
                    {
                        "Title": "Program 1"
                    },
                    {
                        "Title": "Program 3"
                    }
            ],
            "ProgramEngagementManagerContact": {
                "FullName": "Sally Reynolds",
                "Email": "sallyr@anitab.org",
                "WorkPhone": "(415) 309-6294"
            },
            "Title": "Bank of America",
            "PartnerType": "Pioneering",
            "Logo": {
                "Description": "Logo",
                "Url": "https://anitaborgo365.sharepoint.com/:i:/r/sites/PartnerPortal/PartnerLogos/BofA.png"
                
            },
            "PartnershipStartDate" : "2015-01-01T08:00:00Z",
            "PartnershipRenewalDate" : "2019-01-01T08:00:00Z",
            "WorkAddress" : "123 Main"},
        {

            "BusinessDevelopmentExecutivePers": {
                "Title": "Robert Graham",
                "EMail": "admin@rjg.onmicrosoft.com",
                "WorkPhone": "4153086294"
            },
            "BusinessDevelopmentManagerContac": {
                "FullName": "Jane Smith",
                "Email": "janes@anitab.org",
                "WorkPhone": "(650) 310-3420"
            },
            "ProgramEngagementManagerPerson": {
                "Title": "user",
                "EMail": "user1@rjg.onmicrosoft.com",
                "WorkPhone": null
            },
            "ProgramParticipation": [
                    {
                        "Title": "Program 1"
                    },
                    {
                        "Title": "Program 3"
                    }
            ],
            "ProgramEngagementManagerContact": {
                "FullName": "Sally Reynolds",
                "Email": "sallyr@anitab.org",
                "WorkPhone": "(415) 309-6294"
            },
            "Title": "Intel",
            "PartnerType": "Pioneering",
            "Logo": {
                "Description": "Logo",
                "Url": "https://anitaborgo365.sharepoint.com/:i:/r/sites/PartnerPortal/PartnerLogos/intel.png"
            },
            "PartnershipStartDate" : "2010-01-01T08:00:00Z",
            "PartnershipRenewalDate" : "2019-01-01T08:00:00Z",
            "WorkAddress" : "905 Smith Road"
        } 
    ];



    public static get(): Promise<IPartner[]> {
        return new Promise<IPartner[]>((resolve) => {
            resolve(MockHttpClient._items);
        });

    }

}
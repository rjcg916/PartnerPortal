import { IDiscussion } from './DiscussionsInfoWebPart';

export default class MockHttpClient {


    private static _items: IDiscussion[] = [
        {
            "Id": 1,
            "ID": 1,
            "Title": "Test Discussion 1",
            "Modified": "2018-04-23T23:23:49Z",
            "Created": "2018-04-19T19:20:03Z",
            "Body": "<div class=\"ExternalClass91955E5B88BC4E7FBAE10C6E2BCECCCF\"><p>​What is your favorite snack food?​​​<br></p></div>",
            "ParentItemID": null
        },
        {
            "Id": 2,
            "ID": 2,
            "Title": "My Thoughts on Topic A",
            "Modified": "2018-04-19T19:21:35Z",
            "Created": "2018-04-19T19:21:35Z",
            "Body": "<div class=\"ExternalClassD8BFF3CDACF74DB68FEEF1B79A49F6C4\">Donec metus enim, faucibus semper leo eu, dignissim accumsan ante. Maecenas pulvinar efficitur felis nec lacinia. Nullam ante est, efficitur ac eros eget, gravida porta enim. Cras gravida laoreet velit eu efficitur. In vel lacus sit amet urna volutpat ultrices sit amet a dui. Nam porttitor, ligula a pellentesque sodales, ante turpis ullamcorper nisl, ac luctus nunc lorem ac orci. Mauris scelerisque turpis pellentesque, mollis nibh eget, porta erat. Maecenas pretium massa et risus cursus, ut ullamcorper justo elementum. Aenean at lectus ligula. Nunc lacinia lobortis gravida. Sed fermentum consequat posuere.​<br></div>",
            "ParentItemID": null
        },
        {
            "Id": 3,
            "ID": 3,
            "Title": null,
            "Modified": "2018-04-19T22:24:37Z",
            "Created": "2018-04-19T22:24:37Z",
            "Body": "<div class=\"ExternalClass1C37F19C881D4C5EBE64FFD53657510C\"><p>I agree​</p></div>",
            "ParentItemID": 2
        },
        {
            "Id": 4,
            "ID": 4,
            "Title": null,
            "Modified": "2018-04-23T17:38:16Z",
            "Created": "2018-04-23T17:38:16Z",
            "Body": "<div class=\"ExternalClass1A4897FF973D40779ADA2FB551DF7FBE\"><p>​Ice Cream​</p></div>",
            "ParentItemID": 1
        },         
        {
            "Id": 5,
            "ID": 5,
            "Title": null,
            "Modified": "2018-04-23T23:12:45Z",
            "Created": "2018-04-23T23:12:45Z",
            "Body": "<div class=\"ExternalClassEDDD28BEFFC74B6D9F4ADDB5B38B7419\"><p>​Cookies​</p></div>",
            "ParentItemID": 1
        },        {
            "Id": 6,
            "ID": 6,
            "Title": null,
            "Modified": "2018-04-23T23:20:31Z",
            "Created": "2018-04-23T23:20:31Z",
            "Body": "<div class=\"ExternalClassC6C71FF39B9D4BBBB83AE6C843A61701\"><p>​​Pretzles<br></p></div>",
            "ParentItemID": 1
        } ];


    public static get(): Promise<IDiscussion[]> {
        return new Promise<IDiscussion[]>((resolve) => {
            resolve(MockHttpClient._items);
        });

    }

}
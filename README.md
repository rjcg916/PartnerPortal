## Partner Portal

This project includes client-side web parts for the display of Partner and Discussion-related
information as follows:

* Partner Info - custom-formatted display of information for a particular Partner

* Discussion Info - an entry point to the Discussion list which can be used on a Modern Page

### Getting Started

Insure your development environment is correctly configured as described here: 
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment

Review the following to understand the overall development process: 
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```


This package produces the following:
* src/webparts/* -  source code folders for each web part
* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* sharepoint/solution/* - resources which should be uploaded to a CDN.


From the command line of the project directory, you 
can use the following commands:

* Build and preview web parts in workbench
```bash
gulp serve
```
* Package solution for development deployment to app catalog
```bash
gulp package-solution  
```

* Package solution for production deployment to app catalog
```bash
gulp bundle --ship  
gulp package-solution -ship
```

### Installation options

The completed package must be installed into the SharePoint app catalog.  Once installed, 
the web part will be available for 
selection along with other standard and custom web parts.

After placement of the web part on a page, the web part properties must be used to configure list and path names.


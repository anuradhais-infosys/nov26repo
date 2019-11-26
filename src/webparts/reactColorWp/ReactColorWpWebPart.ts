import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactColorWpWebPartStrings';
import ReactColorWp from './components/ReactColorWp';
import { IReactColorWpProps } from './components/IReactColorWpProps';
import { SPHttpClient } from "@microsoft/sp-http";

export interface IReactColorWpWebPartProps {
  description: string;
}

export default class ReactColorWpWebPart extends BaseClientSideWebPart<IReactColorWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactColorWpProps > = React.createElement(
      ReactColorWp,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
         currentSiteUrl: this.context.pageContext.web.absoluteUrl
     }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

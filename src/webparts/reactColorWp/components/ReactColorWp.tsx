import * as React from 'react';
import styles from './ReactColorWp.module.scss';
import { IReactColorWpProps } from './IReactColorWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IColor} from "../IColor";
import { ColorList, IColorListProps } from "./ColorList";

import {IReactWebPartDemoState} from './IReactColorWebPartState';

import {SPHttpClientResponse , SPHttpClient} from '@microsoft/sp-http';

export default class ReactColorWp extends React.Component<IReactColorWpProps, IReactWebPartDemoState> {
  private _colors: IColor[] = [
        { id: 1, title: 'Green' },
        { id: 2, title: 'Yellow' },
        { id: 3, title: 'Pink' }
      ];

      
    constructor(props:IReactWebPartDemoState) {
         super(props);
         this.state = { colors: [] };
      }
    
      private getColorsFromSpList(): Promise<IColor[]> {
            return new Promise<IColor[]>((resolve, reject) => {
              const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('FavColors')/items?$select=Id,Title`;
              this.props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                  return response.json();
                })
                .then((jsonResponse: any) => {
                  let spListItemColors: IColor[] = [];
                  for (let index = 0; index < jsonResponse.value.length; index++) {
                    spListItemColors.push({
                      id: jsonResponse.value[index].Id,
                      title: jsonResponse.value[index].Title
                    });
          
                    resolve(spListItemColors);
                  }
                });
            });
          }

        public componentDidMount(): void {
              this.getColorsFromSpList()
                .then((spListItemColors: IColor[]) => {
                  this.setState({ colors: spListItemColors });
                });
            }

          private _removeColor = (colorToRemove: IColor): void => {
            const newColors = this.state.colors.filter(color => color != colorToRemove);
            this.setState({ colors: newColors });
          }       
        
  public render(): React.ReactElement<IReactColorWpProps> {
    return (
      <div className={ styles.reactColorWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <ColorList colors={ this.state.colors }   onRemoveColor={ this._removeColor }/>

              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

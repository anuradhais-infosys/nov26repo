import * as React from 'react';
import { IColor } from '../IColor';
import { List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
export type RemoveColorCallback = (color: IColor) => void;


export interface IColorListProps {
  colors: IColor[];
  onRemoveColor : RemoveColorCallback;

}
export class ColorList extends React.Component<IColorListProps, {}> {
    private _onRenderListCell = (color: IColor, index: number | undefined): JSX.Element => {
            return (
              <div>
                { color.title }<br />
                <DefaultButton text="delete"
                              data={ color.id }
                              onClick={ () => this.props.onRemoveColor(color)        }
                />
              </div>
            );
          }

    private _onButtonClick(color:IColor): void {
            var message='clicked delete for color - '+ color.title;
            alert(message);
          }
            
  public render(): React.ReactElement<IColorListProps> {
    return (
    <div>
          <List items={ this.props.colors } 
                onRenderCell={ this._onRenderListCell } 
          />
        </div>
    
);
  }
}

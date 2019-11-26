import { SPHttpClient } from "@microsoft/sp-http";
export interface IReactColorWpProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;

}

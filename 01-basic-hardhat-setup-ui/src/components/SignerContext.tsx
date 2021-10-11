import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import React from "react";

export interface ViewerProps {
  viewer: JsonRpcSigner;
}

export const ViewerContext = React.createContext<JsonRpcSigner | null>(null);

export function withViewer<T extends object>(Component: React.FunctionComponent<ViewerProps & T>): React.FunctionComponent<T> {
  const ComponentWithViewer = (props: T) => {
    return <ViewerContext.Consumer>{(viewer) => (viewer ? <Component {...props} viewer={viewer} /> : <div>No Viewer</div>)}</ViewerContext.Consumer>;
  };

  return ComponentWithViewer;
}

export default ViewerContext;

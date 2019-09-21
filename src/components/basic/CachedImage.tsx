import React from "react";
import { ImageStyle, Image } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from 'expo-file-system';
import { ImageProps } from "react-native-elements";

interface IProps extends ImageProps {
  uri: string;
}

export default class CacheImage extends React.Component<ImageProps> {
  state = {
    source: null
  };

  componentDidMount = async () => {
    const {
      source: { uri = "" }
    }: any = this.props;

    const name = shorthash.unique(uri);
    const fileExtention = uri.split(".").pop();
    const path = `${FileSystem.cacheDirectory}${name}.${fileExtention}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      this.setState({
        source: {
          uri: image.uri
        }
      });
      return;
    }

    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri
      }
    });
  };

  render() {
    const { ...attributes } = this.props;
    return (
      <Image source={this.state.source} resizeMode="cover" {...attributes} />
    );
  }
}

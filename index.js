/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Navigation from "./src/screens/Navigation"

console.log("Entrou")
AppRegistry.registerComponent(appName, () => Navigation);

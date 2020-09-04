# Document Digitization.

The easy way to digitize your document.

Technology Stack:
- React Native
- Django
- AWS 

## Clone and install


```bash
git clone git@github.com:mariogarcia-ar/Document-Digitization.git

cd Document-Digitization

npm install 

npm start
```

## Publish
@TODO

## Mobile App 

Create the expo app 

```bash

expo init Document-Digitization

cd Document-Digitization

npm start 

```

Launch in Android

```bash
npm run android
```

Install dependencies for navigation

```bash
npm install @react-navigation/native  --save

npm install @react-navigation/stack  @react-native-community/masked-view  react-native-screens  react-native-safe-area-context  react-native-gesture-handler  --save
```



Install dependencies for camara

```bash
expo install expo-camera
```

Generate bundle
for this you should have an expo account

```bash
expo build:android
```
Then go to expo.io -> login -> and see the status of your build.
Enjoy!
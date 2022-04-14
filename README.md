# Buletin Admin

Buletin Admin is the frontend web part of the Buletin App. It will deal with admin and superadmin functionalities, and resetting password for all users.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install buletin admin's dependencies.

```bash
yarn install
```

## Usage
Make sure to setup a GCP project beforehand to get the CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN. Additionally create folders at Google Drive that's accessible to an account that has been authorized with Google Drive API at GCP. For further information on how to setup the GCP Project, check the frontend web admin installation guide [here](https://docs.google.com/document/d/1fbMMFY1FM25inibxn4REDS4qhtSgtqD-/edit#)

Create a .env file from the.env.example template. Fill accordingly
```env
REACT_APP_API_URL=
REACT_APP_CATEGORY_FOLDER=
REACT_APP_CHANNEL_FOLDER=
REACT_APP_PLAYLIST_FOLDER=
REACT_APP_VIDEO_FOLDER=
REACT_APP_VIDEO_THUMBNAIL_FOLDER=
REACT_APP_REFRESH_TOKEN=
REACT_APP_CLIENT_ID=
REACT_APP_CLIENT_SECRET=
```
Run
```bash
yarn build
serve -s build
```
Navigate to localhost:3000 to look at the project


## Author
Buletin K2 Group 16
/**
 * @link https://www.electronforge.io/guides/create-and-add-icons
 */
module.exports = {
  packagerConfig: {
    icon: 'images/icon'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'images/icon.ico',
      },
    },
//    {
//      name: '@electron-forge/maker-zip',
//      platforms: ['darwin'],
//    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'images/icon.png'
        }
      },
    }
//    {
//      name: '@electron-forge/maker-rpm',
//      config: {},
//    },
  ],
};

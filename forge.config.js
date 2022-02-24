const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');
const dotenv = require("dotenv")

dotenv.config()

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

if (process.env['WINDOWS_CODESIGN_FILE']) {
    const certPath = path.join(__dirname, 'win-certificate.pfx');
    const certExists = fs.existsSync(certPath);

    if (certExists) {
        process.env['WINDOWS_CODESIGN_FILE'] = certPath;
    }
}

const config = {
    packagerConfig: {
        name: "Bonnie's apps",
        executableName: "Bonnie's apps",
        asar: true,
        icon: path.resolve(__dirname, 'src', 'icons', 'mac', 'icon'),
        appBundleId: 'com.loaysa.com',
        appCategoryType: 'public.app-category.tools',
        osxSign: {
            identity: "Developer ID Application: Guillermo Fernandez de Loaysa Babiano (942HM869G6)",
            hardenedRuntime: true,
            'gatekeeper-assess': false,
            entitlements: './entitlements.plist',
            'entitlements-inherit': './entitlements.plist',
            'signature-flags': 'library',
        },
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "Bonnie's apps"
            }
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: "@electron-forge/maker-dmg",
            config: {
                format: "ULFO",
                icon: path.resolve(__dirname, 'src', 'icons', 'mac', 'icon.icns'),
                overwrite: true
            }
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'gloaysa',
                    name: 'bonnies_apps',
                },
                draft: true,
                prerelease: false,
            },
        },
    ],
};

function notarizeMaybe() {
    if (process.platform !== 'darwin') {
        return;
    }

    if (!process.env.CI) {
        console.log(`Not in CI, skipping notarization`);
        return;
    }

    if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
        console.warn(
            'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!',
        );
        return;
    }

    console.log('Notarizing your app');

    config.packagerConfig.osxNotarize = {
        appBundleId: 'com.loaysa.com',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_ID_PASSWORD,
        ascProvider: '942HM869G6',
    };
}

notarizeMaybe();

// Finally, export it
module.exports = config;

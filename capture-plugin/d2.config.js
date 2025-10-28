const config = {
    name: 'capture-plugin',
    title: 'Capture Plugin',
    description: 'A simple plugin to support ID generation',
    type: 'app',

    entryPoints: {
        plugin: './src/Plugin.tsx'
    },
    // todo: verify plugin type
    pluginType: "CAPTURE",
}

module.exports = config

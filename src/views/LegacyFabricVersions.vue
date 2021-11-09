<template>
  <h1>Legacy Fabric Latest Versions</h1>

    <img alt="Discord" src="https://img.shields.io/discord/507304429255393322.svg?label=discord"> <img
        alt="GitHub stars" src="https://img.shields.io/github/stars/Legacy-Fabric/yarn.svg?label=Yarn&style=social"> <img
        alt="GitHub stars" src="https://img.shields.io/github/stars/Legacy-Fabric/fabric.svg?label=Fabric&style=social">

    <p>Minecraft Version:
        <select name="versions" id="versions" v-on:change="updateSelection()">
        </select>
    </p>
    <p>Note fabric-api version may not be the correct version for the given minecraft version. See the <a
            href="https://minecraft.curseforge.com/projects/fabric/files">curseforge</a> page.</p>

    <h3>build.gradle</h3>


    <div name="code">
        <pre><code class="gradle">dependencies {
    minecraft "com.mojang:minecraft:{minecraft_version}"
    mappings "net.fabricmc:yarn:{yarn_version}:v2"
    modImplementation "net.fabricmc:fabric-loader:{loader_version}"
            
    //Fabric api
    modImplementation "{fabric_maven}{fabric_version}"
}</code></pre>
    </div>



    <h3>gradle.properties (Example Mod)</h3>
    <div name="code">
        <pre><code class="properties">minecraft_version={minecraft_version}
yarn_mappings={yarn_version}
loader_version={loader_version}

#Fabric api
fabric_version={fabric_version}</code></pre>
    </div>

    <br>
    <hr>

    
    <h1>Mappings Migration</h1>
    <p>Mappings can be auto updated by using the following command. See the <a href="https://fabricmc.net/wiki/tutorial:migratemappings">wiki page</a> for more help.</p>
    <div name="code">
        <pre><code class="bash">gradlew migrateMappings --mappings "{yarn_version}"</code></pre>
    </div>

    <hr>
    <!-- <h1>Loom Version</h1> -->

    <h3>The recommended loom version is <strong>0.7-SNAPSHOT</strong></h3>

    <br>

    <!-- <p>Want to help improve this page? Fork it on <a href="https://github.com/modmuss50/fabric-versions">github</a></p> -->

</template>

<script lang="ts">

    document.addEventListener('DOMContentLoaded', function () {

        //Taken from https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
        String.prototype.replaceAll = function (search: string | RegExp, replacement: any): string {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        getJSON("https://meta.legacyfabric.net/v1/versions/game", function (data: any) {
            populateVersions(data);
        });



    }, false);

    var mcVersions: any;

    function populateVersions(versions: { [x: string]: any; }) {
        var versionList: any = document.getElementById("versions");
        var stable;

        for (let i in versions) {
            var version = versions[i];

            if (version.stable && stable == null) {
                stable = version.version;
            }

            var option = document.createElement("option");
            option.text = version.version;
            versionList.add(option);
        }

        mcVersions = versions;

        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("version")) {
            versionList.value = urlParams.get("version");
        } else {
            versionList.value = stable;
        }

        load();

    }

    function updateSelection() {
        var versionList: any = document.getElementById("versions");
        insertParam("version", versionList.value);
    }

    function load() {
        var versionList: any = document.getElementById("versions");

        var urlParams = new URLSearchParams(window.location.search);

        var version: any = versionList.value;

        if (urlParams.has("version")) {
            version = urlParams.get("version");
        }

        getJSON("https://meta.legacyfabric.net/v1/versions/loader/" + version, function (data: any[]) {
            if (data[0]) {
                let meta = data[0];
                let codeBlocks: any = document.getElementsByName("code");
                for (let i in codeBlocks) {
                    if (i.length > 1) {
                        continue
                    }
                    let block: any = codeBlocks[i];
                    block.innerHTML = block.innerHTML.replaceAll("{minecraft_version}", meta.mappings.gameVersion);
                    block.innerHTML = block.innerHTML.replaceAll("{yarn_version}", meta.mappings.version);
                    block.innerHTML = block.innerHTML.replaceAll("{loader_version}", meta.loader.version);
                }

                let versionUrl = "https://maven.legacyfabric.net/net/legacyfabric/legacy-fabric-api/legacy-fabric-api/maven-metadata.xml";
                let mavenStr = "net.legacyfabric.legacy-fabric-api:legacy-fabric-api:";

                let branch = "1.8.9"
                //TODO make this better
                if(version === "1.12.2"){
                    branch = "1.12.2"
                }

                findVersion(versionUrl, branch,
                    function (version: any) {
                        let codeBlocks: any = document.getElementsByName("code");
                        for (let i in codeBlocks) {
                            let block = codeBlocks[i];
                            block.innerHTML = block.innerHTML.replaceAll("{fabric_version}", version);
                            block.innerHTML = block.innerHTML.replaceAll("{fabric_maven}", mavenStr);
                        }
                    })
            }
        });


    }

    function findVersion(url: string, branch: string, onLoad: (arg0: string|null) => void) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
                
                let versions = xmlDoc.getElementsByTagName("version");
                let latestVersion = xmlDoc.getElementsByTagName("release")[0].childNodes[0].nodeValue;

                Object.keys(versions).forEach(function(value, number) {
                    let version: any = versions[number].childNodes[0].nodeValue;
                    if(version.endsWith(branch)){
                        latestVersion = versions[number].childNodes[0].nodeValue;
                    }

                    console.log(versions[number].childNodes[0].nodeValue)
                });
                onLoad(latestVersion)
            }
        };

        //Get around caching issues
        var milliseconds = (new Date).getTime();
        url += "?t=" + milliseconds

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function getJSON(url: string, callback: { (data: any): void; (data: any): void; (arg0: any): void; }) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(xhr.response);
            } else {
                console.log('Something went wrong: ' + status);
            }
        };
        xhr.send();
    };

    //Thanks https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript
    function insertParam(key: string, value: string) {
        key = encodeURI(key); value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length; var x; while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }

    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "Legacy Fabric Versions",
        methods: {
            updateSelection: function () {
                updateSelection()
            }
        }
    })

</script>
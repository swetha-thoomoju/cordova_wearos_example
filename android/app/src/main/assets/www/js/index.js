/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        alert('Received Event: ' + id);

        // Receiving messages from Watch
        var receiveMessageSuccess = function (message) {
            // Received a message
            var value = JSON.stringify(message);
            alert("Received message from Watch : " + value);
        };
        var receiveMessageFailure = function () {
            alert("Could not receive message from Watch");
        };

        // Sending Messages to Watch
        var sendMessageSuccess = function () {
            alert("Message sent successfully!");
        };
        var sendMessageFailure = function () {
            alert("Could not send message to Watch.");
        };

        var sendMessage = function() {
            // Sends a message through 'sendMessage' - it 'should be' connected now
            var message = { message: "hello from phone", value: "1234", foo: "bar" };
            WearOsPlugin.sendMessage(sendMessageSuccess, sendMessageFailure, message);
            // Register to receive messages from the watch
        }; 

        // Initialised a Session successfully
        var initWatchSuccess = function () {
            // Waits for 2secs, it should be enough to initialise things up, find/connect to the watch
            window.setTimeout(() => {
                sendMessage();
                WearOsPlugin.registerMessageListener(receiveMessageSuccess, receiveMessageFailure);

            }, 5000);
        };
        var initWatchFailure = function () {
            alert("Could not connect to Watch.");
        };

        // Starts things up
        WearOsPlugin.init(initWatchSuccess, initWatchFailure);
    }
};

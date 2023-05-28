(function() {
    'use strict';
    var MyFunComponent = new Class({
        Extends: Rpm.WebComponent,
        componentName: 'MyFunComponent',
        buildComponentContent: function () {
            this.el = {
                link1: this.buildButton('One'),
                link2: this.buildButton('Two'),
                link3: this.buildButton('Three'),
                info: this.buildInfo(),
                topic1: this.buildTopic('topic1'),
                topic2: this.buildTopic('topic2'),
                globalTopic: this.buildTopic('globalTopic'),
            };
            return [
                this.el.link1,
                this.el.link2,
                this.el.link3,
                this.el.info,
                this.el.topic1,
                this.el.topic2,
                this.el.globalTopic,
            ];
        },
        buildButton: function(text) {
            return new Element('button', { text: text });
        },
        buildInfo: function() {
            return new Element('div');
        },
        buildTopic: function(topicName) {
            const el = new Element('div');
            el.set('text', `${topicName}`);
            return el;
        },
        connectComponentUI: function () {
            this.el.link1.addEvent('click', this.buttonClicked.bind(this));
            this.el.link2.addEvent('click', this.buttonClicked.bind(this));
            this.el.link3.addEvent('click', this.buttonClicked.bind(this));
            pubsub.subscribe(this.buttonClicked.bind(this), 'topicMooToolsClick');
            pubsub.subscribe(this.setInfoFor.bind(this), 'topic1');
            pubsub.subscribe(this.setInfoFor.bind(this), 'topic2');
            pubsub.subscribe(this.setInfoFor.bind(this));
        },
        buttonClicked: function(event)  {
            event.stopPropagation();
            var text =  event.target.get('text');
            this.setText(text);
            this.fireEvent('ButtonClicked', text);
            pubsub.publish(text, 'topicMooTools');
        },
        setInfoFor: function(text, topicName) {
            this.el[topicName]?.set('text', `${topicName}: ${text}`);
            this.el.globalTopic.set('text', `globalTopic: ${text}`);
        },
        setText: function(text) {
            this.el.info.set('text', text);
        }
    });
  
    window.addEvent('load', function() {
        var funComponent = new MyFunComponent({
            instanceID: 'GlobalFunComponent'
        });
        funComponent.renderInside($('old'));
    });
    
  })();
  
/**
 * Created by rbailey on 03/11/2014.
 */
var bodyParser = require('body-parser');    // used below to allow us to access the body as a property of the request).
var Feed = require('feed');

module.exports = function(db, app) {
    app.use(bodyParser.json());

    app.post('/api/jobs', function (req, res) {
        // look at mocha and inversion of control libs for node.
        db.saveContract(req.body);
        res.end();
    });

    app.get('/api/jobsfeed', function(req, res) {
        db.findContracts().then(function(collection) {
            var contractFeed = new Feed({
                id:             'XYZ',
                title:          'Contract Domain Event Feed',
                description:    'A feed of domain events from the FCT contracts service!',
                link:           'http://example.com/',
                image:          'http://example.com/image.png',
                copyright:      'All rights reserved 2013, John Doe',

                current:        'http://example.com/current',
                via:            'http://example.com/9',
                nextArchive:    'http://example.com/10',
                prevArchive:    'http://example.com/8',

                author: {
                    name:       'Contract Management Service',
                    email:      'support@fct.com',
                    link:       'https://sfa.biz.gov.uk/fct'
                }
            });

            collection.forEach(function(item){
                contractFeed.addItem({
                   title:          item.contractID,
                   link:           'http://test.com',
                   description:    item.description,
                   author: [
                       {
                           name:   'CRM Workflow',
                           email:  'janedoe@example.com',
                           link:   'https://example.com/janedoe'
                       }
                   ],
                   date:           new Date()
                });
            });

            res.send(contractFeed.render('atom-1.0'));
        });
    });

    app.get('/api/jobs', function(req, res) {
        db.findContracts().then(function(collection) {
            res.send(collection);
        });
    });
};


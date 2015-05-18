/**
 * Created by rbailey on 31/10/2014.
 */
var mongoose = require('mongoose');
require('./models/Contracts');
var Promise = require('bluebird');

var Contract = mongoose.model('Contract');

var findContracts = function(query) {
    return Promise.cast(Contract.find(query, {}, { skip: 2, limit: 2 }).exec());
};

exports.findContracts = findContracts;

//exports.saveJob = function(jobToSave){
//    return new Promise(function(resolve, reject){
//        createJob(jobToSave)
//            .then(function(){
//                resolve(jobToSave);
//            });
//    });
//};

var createContract = Promise.promisify(Contract.create, Contract);
exports.saveContract = createContract;

exports.connectDb = Promise.promisify(mongoose.connect, mongoose);

exports.seedContracts = function(){
    return findContracts({})
        .then(function(collection){
            if (collection.length == 0){
                return Promise.map(seedContracts, function(contract){
                    return createContract(contract);
                })
            }
        })
};


var seedContracts = [
    {contractID:'CTR01', contractVersion:3, UKPRN:'10092991', ProviderName: 'Lichfield College', FSPCode: 'OLASS1516', contractingPeriod: '1516', description: 'Prisoner training'},
    {contractID:'CTR02', contractVersion:3, UKPRN:'10092991', ProviderName: 'Lichfield College', FSPCode: '1618APPS1516', contractingPeriod: '1516', description: 'Apprenticeships training'},
    {contractID:'CTR03', contractVersion:3, UKPRN:'10092923', ProviderName: 'Birmingham University College', FSPCode: '1618APPS1516', contractingPeriod: '1516', description: 'Apprenticeships training in Brum'},
    {contractID:'CTR04', contractVersion:3, UKPRN:'10092372', ProviderName: 'Monsters University', FSPCode: '1618APPS1516', contractingPeriod: '1516', description: 'Monsterous fun'}
];



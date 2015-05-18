/**
 * Created by rbailey on 24/10/2014.
 */
var mongoose = require('mongoose');

var contractSchema = mongoose.Schema({
    contractID:{type:String},
    contractVersion:{type:Number},
    UKPRN:{type:String},
    ProviderName:{type:String},
    FSPCode:{type:String},
    contractingPeriod:{type:Number},
    description:{type:String}
});

mongoose.model('Contract', contractSchema);


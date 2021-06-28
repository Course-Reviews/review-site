import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
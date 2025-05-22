import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    icon: {
        type: String,

    },
    component: {
        type: String,

    },
});

const Component = mongoose.model('Component', ComponentSchema);

export default Component;

const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');
const Dotenv = require('dotenv');

Enzyme.configure({
    adapter: new Adapter(),
});

const name = '.env.test';

const file_path = `${process.cwd()}/${name}`;

const output = Dotenv.config({ path: file_path });

// console.log({ file_path, output });

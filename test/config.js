import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import enzyme, { configure } from 'enzyme';
import sass from 'node-sass';
import hook from 'css-modules-require-hook';

const jsdom = require('jsdom');

configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
const exposedProperties = ['window', 'navigator', 'document'];
chai.use(sinonChai);

global.document = document;
global.window = document.defaultView;
/* Provide global use of these methods without imports */
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
global.shallow = enzyme.shallow;
global.mount = enzyme.mount;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'node.js' };

hook({
  extensions: ['.scss', '.css'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({ data, file }).css,
});

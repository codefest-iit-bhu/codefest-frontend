import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import ResponsiveTwoColumnLayout from './path/to/ResponsiveTwoColumnLayout.vue';
import SectionLayout from './path/to/SectionLayout.vue';

Vue.use(vueCustomElement);

Vue.config.productionTip = false;

// Register Vue components as web components
Vue.customElement('responsive-two-column-layout', ResponsiveTwoColumnLayout);
Vue.customElement('section-layout', SectionLayout);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



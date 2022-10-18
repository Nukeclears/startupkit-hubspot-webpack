import { createApp } from 'vue'

// ExampleOverview

import ExampleOverview from '../BL/Components/exampleOverview.vue'


const exampleOverviewElements = document.querySelectorAll(".vexampleOverview");

exampleOverviewElements.forEach((el, index) => {
    if (el.id && el.id !== '') {
        createApp({}).component('example-overview', ExampleOverview).mount('#' + el.id);
    }
    else {
        console.error("exampleOverviewElement contains no id, cannot mount app");
    }
});










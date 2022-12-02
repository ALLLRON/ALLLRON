<template>
  <p>
    <label :for="id" v-if=" text !== '' ">{{ text }}</label>
    <select :id="id">
      <option
        v-for="myoption in myoptions"
        :key="myoption.id"
        :value="myoption.id"
        :selected="myoption.id === selectedValue.id"
      >{{ myoption.name }}</option>
    </select>
  </p>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator";
import MyOptionInterface from "./../models/MyOption/MyOptionInterface";

export default Vue.extend({
  props: {
    text: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    myoptions: {
      type: Array as () => MyOptionInterface[],
      required: true
    },
    selectedValue: {
      type: Object
    }
  }
});
</script>

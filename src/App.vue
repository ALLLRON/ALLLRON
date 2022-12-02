<template>
  <FormProvider :form="form" :values="model">
    <IForm :model="model">
      <SchemaField :schema="schema" :scope="{ useAsyncDataSource, loadData }">
      </SchemaField>
    </IForm>
  </FormProvider>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FormProvider, createSchemaField } from "@formily/vue";
import { createForm } from "@formily/core";
import { action } from "@formily/reactive";
import Select from "../components/formily/select";
import IFormItem from "../components/formily/i-form-item";
import IForm from "../components/formily/i-form";
import { MySelect } from "../components/iview/index";

const { SchemaField } = createSchemaField({
  components: { Select, FInput, IFormItem, MySelect },
});

@Component({
  components: {
    FormProvider,
    SchemaField,
    IForm,
  },
})
export default class FormBySchema extends Vue {
  private model = { input: "", select: "", linkage: "" };
  private form = createForm({});

  private schema = {
    type: "object",
    properties: {
      linkage: {
        type: "string",
        title: "联动选择框",
        name: "linkage",
        "x-decorator": "IFormItem",
        "x-component": "MySelect",
        "x-component-props": {
          data: [
            {
              VALUE: "发请求1",
              CODE: 1,
            },
          ],
        },
      },
      select: {
        type: "string",
        title: "异步选择框",
        "x-decorator": "IFormItem",
        "x-component": "Select",
        "x-component-props": {
          style: "width: 240px;",
          clearable: true,
        },
        "x-reactions": ["{{useAsyncDataSource(loadData)}}"],
      },
      input: {
        type: "string",
        title: "联动的输入框",
        "x-decorator": "IFormItem",
        "x-component": "FInput",
        "x-component-props": {
          placeholder: "请输入",
          search: true,
        },
      },
    },
  };

  private useAsyncDataSource = (service) => (field) => {
    field.loading = true;
    service(field).then(
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      })
    );
  };

  private async loadData(field) {
    const linkage = field.query("linkage").get("value");
    if (!linkage)
      return [
        {
          label: "A",
          value: "aa",
        },
      ];
    return new Promise((resolve) => {
      setTimeout(() => {
        if (linkage === 1) {
          resolve([
            {
              label: "AAA",
              value: "aaa",
            },
            {
              label: "BBB",
              value: "ccc",
            },
          ]);
        } else if (linkage === 2) {
          resolve([
            {
              label: "CCC",
              value: "ccc",
            },
            {
              label: "DDD",
              value: "ddd",
            },
          ]);
        }
      }, 1500);
    });
  }
}
</script>

<style scoped></style>

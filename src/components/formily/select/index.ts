import { connect, h, mapProps, mapReadPretty } from "@formily/vue";
import { defineComponent } from "vue-demi";
import { PreviewText } from "../preview-text";

import { Option, Select as ISelect } from "view-design";
import { resolveComponent } from "../__builtins__";

export type SelectProps = {
  options?: Array<any>;
  [key: string]: any;
};

const SelectOption = defineComponent<SelectProps>({
  name: "FSelect",
  props: ["options"],
  setup(customProps, { attrs, slots, listeners }) {
    debugger;
    return () => {
      const options = customProps.options || [];
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === "string") {
                    return h(
                      Option,
                      { props: { value: option, label: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option })
                        ]
                      }
                    );
                  } else {
                    return h(
                      Option,
                      {
                        props: {
                          ...option
                        }
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option, {
                            option
                          })
                        ]
                      }
                    );
                  }
                })
            }
          : slots;
      return h(
        ISelect,
        {
          attrs: {
            ...attrs
          },
          on: listeners
        },
        children
      );
    };
  }
});

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: "options", loading: true }),
  mapReadPretty(PreviewText.Select)
);

export default Select;

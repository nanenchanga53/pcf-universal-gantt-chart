export namespace Xrm {
  namespace EntityMetadata {
    interface AttributesCollection {
      getByName(name: string): OptionSetMetadata;
    }

    interface OptionSetMetadata {
      attributeDescriptor: OptionSetAttributeDescriptor;
    }

    interface OptionSetAttributeDescriptor {
      Id: { guid: string };
      OptionSetId: string;
      OptionSet: OptionMetadata[];
    }

    interface OptionMetadata {
      Label: string;
      Value: number;
      Color: string;
    }

    interface LookupOptions {
      /**
       * Whether the lookup allows more than one item to be selected.
       */
      allowMultiSelect: boolean;

      /**
       * The default entity type.
       */
      defaultEntityType: string;

      /**
       * The default view to use.
       */
      defaultViewId: string;

      /**
       * The entity types to display.
       */
      entityTypes: string[];

      /**
       * The views to be available in the view picker. Only System views are supported (not user views).
       */
      viewIds: string[];
  }

  }
}

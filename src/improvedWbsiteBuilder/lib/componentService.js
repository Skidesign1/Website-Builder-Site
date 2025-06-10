import componentRegistry from '../components/ui-components/component-registry';

export function getComponentElements(componentId) {
  const component = componentRegistry.find(comp => comp.id === componentId);
  return component?.elements || [];
}

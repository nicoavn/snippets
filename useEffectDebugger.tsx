// https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire

const usePrevious = (value: any, initialValue: any) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (
  effectHook: any,
  dependencies: any,
  dependencyNames = []
) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce(
    (accum: any, dependency: any, index: any) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency
          }
        };
      }

      return accum;
    },
    {}
  );

  if (Object.keys(changedDeps).length) {
    console.log("[use-effect-debugger] ", changedDeps);
  }

  useEffect(effectHook, dependencies);
};


// Without types


// https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency
        }
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps);
  }

  useEffect(effectHook, dependencies);
};

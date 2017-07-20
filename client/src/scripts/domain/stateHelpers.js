export const mergeStruct = Struct => (state, updates) => Struct.update(state, { $merge: updates });

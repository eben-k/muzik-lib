export type TActionMeta = {};

const withPayloadType = <T = null, M extends TActionMeta = TActionMeta>() => (
  payload: T,
  meta?: M
) => ({
  payload: payload,
  meta: meta ?? {},
});

export default withPayloadType;

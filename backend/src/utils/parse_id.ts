export const parseId = (
  value: string | string[] | undefined,
): number | null => {
  if (!value || Array.isArray(value)) {
    return null;
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

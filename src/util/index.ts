export function formatCurrency(value: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}

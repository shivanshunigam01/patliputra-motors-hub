import { Checkbox } from '@/components/ui/checkbox';
import { useCompare, CompareProduct } from '@/context/CompareContext';
import { toast } from 'sonner';

interface ProductCompareCheckboxProps {
  product: CompareProduct;
}

export function ProductCompareCheckbox({ product }: ProductCompareCheckboxProps) {
  const { isSelected, addProduct, removeProduct, currentBrand } = useCompare();
  const checked = isSelected(product.id);

  // Disable checkbox if comparing different brand
  const isDisabled = currentBrand !== null && product.brand !== currentBrand && !checked;

  const handleChange = () => {
    if (checked) {
      removeProduct(product.id);
    } else {
      const result = addProduct(product);
      if (!result.success) {
        if (result.reason === 'max_limit') {
          toast.warning('Maximum 2 products can be compared at a time', {
            description: 'Please remove a product first to add another.',
          });
        } else if (result.reason === 'different_category') {
          toast.warning(`You can only compare products within the same brand`, {
            description: `Currently comparing ${currentBrand} products. Clear selection to compare ${product.brand} products.`,
          });
        }
      }
    }
  };

  return (
    <label className={`flex items-center gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <Checkbox
        checked={checked}
        onCheckedChange={handleChange}
        disabled={isDisabled}
        className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary disabled:opacity-50"
      />
      <span className="text-sm font-medium text-foreground">
        {isDisabled ? `Compare (${currentBrand} only)` : 'Compare'}
      </span>
    </label>
  );
}

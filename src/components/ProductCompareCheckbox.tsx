import { Checkbox } from '@/components/ui/checkbox';
import { useCompare, CompareProduct } from '@/context/CompareContext';
import { toast } from 'sonner';

interface ProductCompareCheckboxProps {
  product: CompareProduct;
}

export function ProductCompareCheckbox({ product }: ProductCompareCheckboxProps) {
  const { isSelected, addProduct, removeProduct, canAddMore } = useCompare();
  const checked = isSelected(product.id);

  const handleChange = () => {
    if (checked) {
      removeProduct(product.id);
    } else {
      if (!canAddMore) {
        toast.warning('Maximum 2 products can be compared at a time', {
          description: 'Please remove a product first to add another.',
        });
        return;
      }
      addProduct(product);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={handleChange}
        className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className="text-sm font-medium text-foreground">Compare</span>
    </label>
  );
}

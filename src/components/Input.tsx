import { ct } from '@/utils/style';

export default function Input() {
  return (
    <div
      className={ct(
        'py-1 px-3 bg-gray-200 border-gray-100 rounded-md text-sm',
        'focus:outline-blue-300',
      )}
    >
      <input className="bg-transparent border-none" />
    </div>
  );
}

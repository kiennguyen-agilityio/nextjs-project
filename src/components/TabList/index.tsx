// components
import { Button } from '@/components/common/Button';

// icons
import { SearchIcon } from '@/icons/SearchIcon';
import { CheckIcon } from '@/icons/Check';
import { PaperAirPlanIcon } from '@/icons/PaperAirPlanIcon';
import { DisableIcon } from '@/icons/DisableIcon';
import { ArchiveIcon } from '@/icons/ArchiveIcon';
import { AdjustmentIcon } from '@/icons/AdjustmentIcon';

const Tablist = () => (
  <>
    <div className="flex items-center justify-between mb-6">
      <div className="flex space-x-2 items-center">
        <Button
          customClass="px-2 py-1 bg-blue-500 text-white text-sm rounded-2xl"
          startIcon={<CheckIcon />}
        >
          All
        </Button>
        <Button
          variant="outline"
          customClass="px-2 py-1 border text-sm rounded-2xl"
          startIcon={<PaperAirPlanIcon />}
        >
          Invited
        </Button>
        <Button
          variant="outline"
          customClass="px-2 py-1 border text-sm rounded-2xl"
          startIcon={<AdjustmentIcon />}
        >
          Enabled
        </Button>
        <Button
          variant="outline"
          customClass="px-2 py-1 border text-sm rounded-2xl"
          startIcon={<DisableIcon />}
        >
          Disabled
        </Button>
        <Button
          variant="outline"
          customClass="px-2 py-1 border text-sm rounded-2xl"
          startIcon={<ArchiveIcon />}
        >
          Archived
        </Button>
      </div>

      <div>
        <SearchIcon customClass="h-5 w-5 text-gray-500" />
      </div>
    </div>
  </>
);

export default Tablist;

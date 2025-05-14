
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  status: string[];
  type: string[];
}

const LeaveFilter = ({ onFilterChange }: FilterProps) => {
  const isMobile = useIsMobile();
  const statusOptions = ["Pending", "Approved", "Rejected"];
  const typeOptions = ["Vacation", "Sick Leave", "Personal Leave", "Work From Home"];
  
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleStatusChange = (status: string, checked: boolean) => {
    const newSelectedStatus = checked
      ? [...selectedStatus, status]
      : selectedStatus.filter(s => s !== status);
    
    setSelectedStatus(newSelectedStatus);
    onFilterChange({
      status: newSelectedStatus,
      type: selectedTypes
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newSelectedTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    setSelectedTypes(newSelectedTypes);
    onFilterChange({
      status: selectedStatus,
      type: newSelectedTypes
    });
  };

  const clearFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
    onFilterChange({ status: [], type: [] });
  };

  const totalFilters = selectedStatus.length + selectedTypes.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`h-8 ${isMobile ? 'w-full' : ''}`}>
          <Filter className="h-3 w-3 mr-1" /> Filter
          {totalFilters > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5">
              {totalFilters}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[260px] md:w-56" align={isMobile ? "center" : "end"}>
        {totalFilters > 0 && (
          <div className="px-2 py-1 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{totalFilters} filters applied</span>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
              <X className="h-3 w-3 mr-1" /> Clear
            </Button>
          </div>
        )}
        
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statusOptions.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatus.includes(status)}
            onCheckedChange={(checked) => handleStatusChange(status, checked)}
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Leave Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {typeOptions.map((type) => (
          <DropdownMenuCheckboxItem
            key={type}
            checked={selectedTypes.includes(type)}
            onCheckedChange={(checked) => handleTypeChange(type, checked)}
          >
            {type}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeaveFilter;

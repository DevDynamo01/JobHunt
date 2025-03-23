import React, { useState } from 'react';
import { Filter as FilterIcon, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useJobs } from '@/context/JobContext';
import { getUniqueValues } from '@/utils/jobUtils';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterProps {
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ className }) => {
  const { jobs, filters, setFilters, resetFilters } = useJobs();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    location: true,
    type: true,
    experience: true,
    category: true,
    company: false,
  });
  
  // Get unique values for filter options
  const locations = getUniqueValues(jobs, 'location');
  const jobTypes = getUniqueValues(jobs, 'type');
  const experienceLevels = getUniqueValues(jobs, 'experience');
  const categories = getUniqueValues(jobs, 'category');
  const companies = getUniqueValues(jobs, 'company');
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleFilterChange = (filterType: string, value: string) => {
    const currentFilters = filters[filterType as keyof typeof filters];
    
    if (currentFilters.includes(value)) {
      // Remove the value if it's already selected
      setFilters({
        [filterType]: currentFilters.filter((item: string) => item !== value)
      });
    } else {
      // Add the value if it's not selected
      setFilters({
        [filterType]: [...currentFilters, value]
      });
    }
  };
  
  const isAnyFilterActive = Object.values(filters).some(
    filterArray => filterArray.length > 0
  );
  
  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <FilterIcon className="w-4 h-4 mr-2 text-gray-500" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        {isAnyFilterActive && (
          <button
            onClick={resetFilters}
            className="text-xs text-primary flex items-center hover:underline"
          >
            <X className="w-3 h-3 mr-1" />
            Reset all
          </button>
        )}
      </div>
      
      <div className="p-4 divide-y divide-gray-100 dark:divide-gray-800">
        {/* Location Filter */}
        <FilterSection 
          title="Location" 
          expanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
        >
          {locations.map((location) => (
            <FilterCheckbox
              key={location}
              label={location}
              checked={filters.location.includes(location)}
              onChange={() => handleFilterChange('location', location)}
            />
          ))}
        </FilterSection>
        
        {/* Job Type Filter */}
        <FilterSection 
          title="Job Type" 
          expanded={expandedSections.type}
          onToggle={() => toggleSection('type')}
        >
          {jobTypes.map((type) => (
            <FilterCheckbox
              key={type}
              label={type}
              checked={filters.type.includes(type)}
              onChange={() => handleFilterChange('type', type)}
            />
          ))}
        </FilterSection>
        
        {/* Experience Level Filter */}
        <FilterSection 
          title="Experience Level" 
          expanded={expandedSections.experience}
          onToggle={() => toggleSection('experience')}
        >
          {experienceLevels.map((level) => (
            <FilterCheckbox
              key={level}
              label={level}
              checked={filters.experience.includes(level)}
              onChange={() => handleFilterChange('experience', level)}
            />
          ))}
        </FilterSection>
        
        {/* Category Filter */}
        <FilterSection 
          title="Category" 
          expanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          {categories.map((category) => (
            <FilterCheckbox
              key={category}
              label={category}
              checked={filters.category.includes(category)}
              onChange={() => handleFilterChange('category', category)}
            />
          ))}
        </FilterSection>
        
        {/* Company Filter */}
        <FilterSection 
          title="Company" 
          expanded={expandedSections.company}
          onToggle={() => toggleSection('company')}
        >
          {companies.map((company) => (
            <FilterCheckbox
              key={company}
              label={company}
              checked={filters.company.includes(company)}
              onChange={() => handleFilterChange('company', company)}
            />
          ))}
        </FilterSection>
      </div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  expanded, 
  onToggle, 
  children 
}) => {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <button
        className="w-full flex items-center justify-between text-left mb-2"
        onClick={onToggle}
      >
        <span className="font-medium text-sm">{title}</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expanded && (
        <div className="space-y-2 mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ 
  label, 
  checked, 
  onChange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`filter-${label}`}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label
        htmlFor={`filter-${label}`}
        className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};

export default Filter;

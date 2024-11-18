export interface ClubProps {
  type: string;
  name: string;
  company: string;
  link: string;
  price: string;
  specs?: {
    model: string;
    dexterity: string;
    shaft: string;
    condition: string;
    releaseDate: string;
    manufacturer: string;
    seller: string;
  };
}

export interface SavedClubCategoryProps {
  name: string;
  icon: string;
  isActive?: boolean;
  onSelect: () => void;
}

export interface CompareButtonProps {
  onClick: () => void;
  text: string;
  isComparing?: boolean;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface SpecificationProps {
  label: string;
  value: string;
}

export interface ClubSpecificationsProps {
  specs: ClubProps["specs"];
  isExpanded: boolean;
}

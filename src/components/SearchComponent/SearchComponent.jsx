import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SearchBox, SearchButton, SearchPrice, SearchWrapper, SearchDropdown, PricePopover, PriceCheckbox, ApplyButton } from './style';
import { useDebounce } from '../../hooks/useDebounce';
import { convertPrice } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

const SearchComponent = ({ teachers, priceTeacher }) => {
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
    const searchDebounce = useDebounce(search, 500);
    const navigate = useNavigate();
    const searchBoxRef = useRef(null);
    const priceBtnRef = useRef(null);

    const filtered = teachers?.filter(t =>
        t.user.name?.toLowerCase().includes(searchDebounce.toLowerCase())
    );
    const searchTeacher = filtered?.length > 0 ? filtered : [];

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        setDropdownOpen(true);
    };

    const handleClickSearchButton = () => {
        const path = `search?name=${encodeURIComponent(searchDebounce)
            .split('\\')[0]
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ /g, '-')
            .replace(/\//g, '-')
            .toLowerCase()}`;
        navigate(`/${path}`);
    };

    const handlePriceChange = (value) => {
        setSelectedPrices(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleApplyPrice = () => {
        priceTeacher(selectedPrices);
        setShowPopover(false);
    };

    const priceOptions = [
        { label: 'Dưới 200.000₫', value: '0-199999' },
        { label: '200.000₫ - 300.000₫', value: '200000-300000' },
        { label: 'Trên 300.000₫', value: '300000+' }
    ];

    useEffect(() => {
        if (dropdownOpen && searchBoxRef.current) {
            const rect = searchBoxRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [dropdownOpen]);

    useEffect(() => {
        if (showPopover && priceBtnRef.current) {
            const rect = priceBtnRef.current.getBoundingClientRect();
            setPopoverPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }, [showPopover]);

    return (
        <div style={{ maxWidth: '1270px' }}>
            <SearchWrapper>
                <SearchBox ref={searchBoxRef}>
                    <FiSearch style={{ marginRight: 8, color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm giáo viên..."
                        onChange={handleChangeSearch}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                        value={search}
                    />
                </SearchBox>

                <SearchPrice ref={priceBtnRef}>
                    <button onClick={() => setShowPopover(!showPopover)}>
                        Giá <FiChevronDown />
                    </button>
                </SearchPrice>

                <SearchButton>
                    <button onClick={handleClickSearchButton}>Tìm kiếm</button>
                </SearchButton>
            </SearchWrapper>

            {dropdownOpen && searchTeacher?.length > 0 &&
                ReactDOM.createPortal(
                    <SearchDropdown style={{
                        position: 'absolute',
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        zIndex: 600
                    }}>
                        {searchTeacher.map((item) => (
                            <li key={item.id}>
                                <Link to={`/teachers/${item.id}`}>
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                                        alt={item.user.name}
                                    />
                                    <div>
                                        <strong>{item.user.name}</strong>
                                        <div style={{ fontSize: '12px', color: '#888' }}>
                                            Giá: <span style={{ color: '#ff424e' }}>{convertPrice(item.pricePerHour)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </SearchDropdown>,
                    document.body
                )
            }

            {showPopover &&
                ReactDOM.createPortal(
                    <PricePopover style={{
                        position: 'absolute',
                        top: popoverPos.top,
                        left: popoverPos.left,
                        zIndex: 600
                    }}>
                        {priceOptions.map(opt => (
                            <PriceCheckbox key={opt.value}>
                                <input
                                    type="checkbox"
                                    id={opt.value}
                                    checked={selectedPrices.includes(opt.value)}
                                    onChange={() => handlePriceChange(opt.value)}
                                />
                                <label htmlFor={opt.value}>{opt.label}</label>
                            </PriceCheckbox>
                        ))}
                        <ApplyButton onClick={handleApplyPrice}>Áp dụng</ApplyButton>
                    </PricePopover>,
                    document.body
                )
            }
        </div>
    );
};

export default SearchComponent;

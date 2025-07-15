import { Theme } from "@/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useState, useRef, useCallback } from "react";
import { FiCommand } from "react-icons/fi";
import { MdKeyboardArrowUp, MdAdd, MdRemove } from "react-icons/md";

import { Typography } from "../typography";
import {
    ActiveIndicator,
    DropdownContent,
    IconGroup,
    InputContainer,
    InputLabel,
    MenuItem,
    PresetItem,
    Separator,
    TriggerButton,
    ZoomInput,
    ZoomInputWrapper,
} from "./styles";

interface IZoomButtonProps {
    initialZoom?: number;
    onZoomChange?: (zoom: number) => void;
    className?: string;
}

const ZoomButton: React.FC<IZoomButtonProps> = ({
    initialZoom = 100,
    onZoomChange,
    className = "",
}) => {
    const [zoom, setZoom] = useState<number>(initialZoom);
    const [inputValue, setInputValue] = useState<string>(initialZoom.toString());
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const dragRef = useRef<{
        startX: number;
        startZoom: number;
    }>({ startX: 0, startZoom: 0 });

    const handleZoomChange = useCallback(
        (newZoom: number) => {
            const clampedZoom = Math.max(1, Math.min(500, newZoom));
            setZoom(clampedZoom);
            setInputValue(clampedZoom.toString());
            onZoomChange?.(clampedZoom);
        },
        [onZoomChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const value = e.target.value;
        setInputValue(value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const numValue = parseInt(inputValue);
            if (!isNaN(numValue) && numValue > 0) {
                handleZoomChange(numValue);
            } else {
                setInputValue(zoom.toString());
            }
        }
    };

    const handleInputBlur = () => {
        const numValue = parseInt(inputValue);
        if (!isNaN(numValue) && numValue > 0) {
            handleZoomChange(numValue);
        } else {
            setInputValue(zoom.toString());
        }
    };

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(true);
            dragRef.current = {
                startX: e.clientX,
                startZoom: zoom,
            };

            const handleMouseMove = (evt: MouseEvent) => {
                const deltaX = evt.clientX - dragRef.current.startX;
                const sensitivity = 0.1;
                const newZoom = dragRef.current.startZoom + deltaX * sensitivity;
                handleZoomChange(Math.round(newZoom));
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                document.body.style.cursor = "default";
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "ew-resize";
        },
        [zoom, handleZoomChange]
    );

    const zoomIn = () => {
        handleZoomChange(zoom + 10);
    };

    const zoomOut = () => {
        handleZoomChange(zoom - 10);
    };

    const zoomToFit = () => {
        handleZoomChange(83);
    };

    const presetZooms = [50, 75, 90, 100, 150];

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <TriggerButton className={className}>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="regular"
                    >
                        {zoom}%
                    </Typography>
                    <MdKeyboardArrowUp size={16} />
                </TriggerButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownContent sideOffset={5}>
                    {/* Input de zoom personalizado */}
                    <InputContainer>
                        <ZoomInputWrapper isDragging={isDragging}>
                            <ZoomInput
                                type="number"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                onBlur={handleInputBlur}
                                placeholder="Zoom %"
                                min="10"
                                max="500"
                            />
                        </ZoomInputWrapper>
                        <InputLabel isDragging={isDragging} onMouseDown={handleMouseDown}>
                            %
                        </InputLabel>
                    </InputContainer>

                    <Separator />

                    {/* Zoom In */}
                    <MenuItem onSelect={zoomIn}>
                        <span>Zoom In</span>
                        <IconGroup>
                            <FiCommand size={12} color={Theme.colors.gray70} />
                            <MdAdd size={12} color={Theme.colors.gray70} />
                        </IconGroup>
                    </MenuItem>

                    {/* Zoom Out */}
                    <MenuItem onSelect={zoomOut}>
                        <span>Zoom Out</span>
                        <IconGroup>
                            <FiCommand size={12} color={Theme.colors.gray70} />
                            <MdRemove size={12} color={Theme.colors.gray70} />
                        </IconGroup>
                    </MenuItem>

                    {/* Zoom to Fit */}
                    <MenuItem onSelect={zoomToFit}>
                        <span>Zoom to Fit</span>
                    </MenuItem>

                    <Separator />

                    {/* Presets de zoom */}
                    {presetZooms.map(presetZoom => (
                        <PresetItem
                            key={presetZoom}
                            onSelect={() => handleZoomChange(presetZoom)}
                            textValue={`Zoom Preset ${presetZoom}%`}
                        >
                            <span>{presetZoom}%</span>
                            {zoom === presetZoom && <ActiveIndicator />}
                        </PresetItem>
                    ))}
                </DropdownContent>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ZoomButton;

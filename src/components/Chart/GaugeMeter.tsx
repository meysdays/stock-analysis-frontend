import { useState } from "react";
import { color_zones } form
const min_value = 0;
const max_value = 100;
const start_angle = -90;
const end_angle = 90;
const total_angle = end_angle - start_angle;
const num_segments = 5;
const segment_gap = 2;
const center_x = canvas_width / 2;
const center_y = canvas_height / 2;
const radius = 80;
let segment_angle = total_angle / num_segments;
let active_segment_angle = segment_angle - segment_gap;




const GaugeMeter = () => {
    const [value, setValue] = useState(0);
    return (
        <div>

        </div>
    );
};

import React, { useEffect, useState } from 'react';
import YieldChart from '../Charts/YieldChart';
import StressChart from '../Charts/StressChart';
import DiseaseChart from '../Charts/DiseaseChart';
import { useButtonContext } from '../../ButtonContext';
import { useParams } from 'react-router-dom';

// const data = [
//     { projectCompletedDate: "2024-10-01 08:30:00", totalYield: 200.00, stressPct: 45.00, diseasePct: 25.00 },
//     { projectCompletedDate: "2024-10-05 09:00:00", totalYield: 220.00, stressPct: 48.00, diseasePct: 28.00 },
//     { projectCompletedDate: "2024-10-10 07:45:00", totalYield: 210.00, stressPct: 52.00, diseasePct: 30.00 },
//     { projectCompletedDate: "2024-10-15 10:15:00", totalYield: 230.00, stressPct: 47.00, diseasePct: 26.00 },
//     { projectCompletedDate: "2024-10-20 11:00:00", totalYield: 250.00, stressPct: 50.00, diseasePct: 33.00 },
//     { projectCompletedDate: "2024-10-25 09:30:00", totalYield: 265.00, stressPct: 53.00, diseasePct: 35.00 },
//     { projectCompletedDate: "2024-10-26 00:46:34", totalYield: 270.00, stressPct: 50.00, diseasePct: 33.33 },
//     { projectCompletedDate: "2024-11-01 12:20:00", totalYield: 275.00, stressPct: 49.00, diseasePct: 31.00 },
//     { projectCompletedDate: "2024-11-05 08:40:00", totalYield: 280.00, stressPct: 47.00, diseasePct: 29.00 },
//     { projectCompletedDate: "2024-11-10 07:30:00", totalYield: 290.00, stressPct: 45.00, diseasePct: 28.00 },
//     { projectCompletedDate: "2024-11-15 11:50:00", totalYield: 295.00, stressPct: 43.00, diseasePct: 27.00 },
//     { projectCompletedDate: "2024-11-20 10:10:00", totalYield: 300.00, stressPct: 42.00, diseasePct: 26.00 },
//     { projectCompletedDate: "2024-11-25 09:00:00", totalYield: 305.00, stressPct: 41.00, diseasePct: 25.00 },
//     { projectCompletedDate: "2024-11-30 08:15:00", totalYield: 310.00, stressPct: 40.00, diseasePct: 24.00 },
//     { projectCompletedDate: "2024-12-05 07:50:00", totalYield: 315.00, stressPct: 39.00, diseasePct: 23.00 },
//     { projectCompletedDate: "2024-12-10 08:35:00", totalYield: 320.00, stressPct: 38.00, diseasePct: 22.00 },
//     { projectCompletedDate: "2024-12-15 09:25:00", totalYield: 325.00, stressPct: 37.00, diseasePct: 21.00 },
//     { projectCompletedDate: "2024-12-20 07:10:00", totalYield: 330.00, stressPct: 36.00, diseasePct: 20.00 },
//     { projectCompletedDate: "2024-12-25 08:45:00", totalYield: 335.00, stressPct: 35.00, diseasePct: 19.00 },
//     { projectCompletedDate: "2025-01-01 10:00:00", totalYield: 340.00, stressPct: 34.00, diseasePct: 18.00 }
// ];

interface DataItem {
    projectCompletedDate: string;
    totalYield: number;
    stressPct: number;
    diseasePct: number;
}

const DataHistoryChart = () => {
    const { isYieldActive, isStressActive, isDiseaseActive } = useButtonContext();
    const [data, setData] = useState<DataItem[]>([]);
    const { id } = useParams<{ id: string }>();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/project/history/by/plantation/${id}`);
                const result = await response.json();

                // Map the response to only include necessary fields
                const mappedData = result.map((item: any) => ({
                    projectCompletedDate: item.projectCompletedDate,
                    totalYield: item.totalYield,
                    stressPct: item.stressPct,
                    diseasePct: item.diseasePct,
                }));
                setData(mappedData);
            } catch (error) {
                console.error("Error fetching project history data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Conditional rendering of charts based on the active toggle */}
            {isYieldActive && !isStressActive && !isDiseaseActive && (
                <>
                    <h2>Yield Comparison Over Time</h2>
                    <YieldChart data={data.map(d => ({ projectCompletedDate: d.projectCompletedDate, totalYield: d.totalYield }))} />
                </>
            )}

            {isStressActive && !isDiseaseActive && !isYieldActive && (
                <>
                    <h2>Stress Comparison Over Time</h2>
                    <StressChart data={data.map(d => ({ projectCompletedDate: d.projectCompletedDate, stressPct: d.stressPct }))} />
                </>
            )}

            {isDiseaseActive && !isStressActive && !isYieldActive && (
                <>
                    <h2>Disease Comparison Over Time</h2>
                    <DiseaseChart data={data.map(d => ({ projectCompletedDate: d.projectCompletedDate, diseasePct: d.diseasePct }))} />
                </>
            )}
        </div>
    );
};

export default DataHistoryChart;

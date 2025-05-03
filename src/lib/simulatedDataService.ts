import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface TyreData {
  id: string;
  timestamp: string;
  pressure: number;
  temperature: number;
  tread_depth: number;
  mileage: number;
  status: 'normal' | 'warning' | 'critical';
  recipe: string;
  npt_time: number;
  // Add other relevant fields from your CSV
}

let originalData: TyreData[] = [];
let currentIndex = 0;

// Function to generate realistic variations in tyre data
const generateVariation = (baseValue: number, variation: number): number => {
  return baseValue + (Math.random() * variation * 2 - variation);
};

export const initializeData = async () => {
  try {
    const response = await fetch('/cleaned_tyres_data_final.csv');
    const csvText = await response.text();
    
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        // Parse the CSV data and convert string values to appropriate types
        originalData = results.data.map((item: any) => {
          // Convert numeric fields
          const numericFields = ['pressure', 'temperature', 'tread_depth', 'mileage', 'npt_time'];
          numericFields.forEach(field => {
            if (item[field]) {
              item[field] = parseFloat(item[field]);
            }
          });

          // Set default values if needed
          return {
            ...item,
            pressure: item.pressure || 32,
            temperature: item.temperature || 25,
            tread_depth: item.tread_depth || 8,
            mileage: item.mileage || 0,
            npt_time: item.npt_time || 0,
            recipe: item.recipe || 'Unknown',
            status: determineStatus(item)
          };
        }) as TyreData[];

        console.log('CSV data loaded successfully:', originalData.length, 'records');
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
  }
};

export const useLiveTyreData = (updateInterval = 3000) => {
  const [currentData, setCurrentData] = useState<TyreData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (originalData.length > 0) {
        const newData = [...currentData];
        
        // Keep only last 20 entries
        if (newData.length >= 20) {
          newData.shift();
        }

        // Get base data
        const baseData = originalData[currentIndex % originalData.length];
        
        // Create new entry with realistic variations
        const newEntry: TyreData = {
          ...baseData,
          timestamp: new Date().toISOString(),
          pressure: generateVariation(baseData.pressure, 0.5),
          temperature: generateVariation(baseData.temperature, 1),
          tread_depth: generateVariation(baseData.tread_depth, 0.1),
          mileage: baseData.mileage + (Math.random() * 10),
          status: determineStatus(baseData)
        };

        newData.push(newEntry);
        setCurrentData(newData);
        currentIndex++;
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [currentData, updateInterval]);

  return currentData;
};

// Function to get all unique recipes
export const getRecipes = (): string[] => {
  const recipes = new Set(originalData.map(item => item.recipe));
  return Array.from(recipes);
};

// Function to get average NPT time for a specific recipe
export const getAverageNptTime = (recipe: string): number => {
  const recipeData = originalData.filter(item => item.recipe === recipe);
  if (recipeData.length === 0) return 0;
  const totalNptTime = recipeData.reduce((sum, item) => sum + (item.npt_time || 0), 0);
  return totalNptTime / recipeData.length;
};

// Function to get recipe statistics
export const getRecipeStats = (recipe: string) => {
  const recipeData = originalData.filter(item => item.recipe === recipe);
  if (recipeData.length === 0) return null;

  return {
    count: recipeData.length,
    avgNptTime: recipeData.reduce((sum, item) => sum + (item.npt_time || 0), 0) / recipeData.length,
    avgPressure: recipeData.reduce((sum, item) => sum + (item.pressure || 0), 0) / recipeData.length,
    avgTemperature: recipeData.reduce((sum, item) => sum + (item.temperature || 0), 0) / recipeData.length,
    avgTreadDepth: recipeData.reduce((sum, item) => sum + (item.tread_depth || 0), 0) / recipeData.length,
    minNptTime: Math.min(...recipeData.map(item => item.npt_time || 0)),
    maxNptTime: Math.max(...recipeData.map(item => item.npt_time || 0))
  };
};

// Function to get overall statistics
export const getOverallStats = () => {
  if (originalData.length === 0) return null;

  return {
    totalRecords: originalData.length,
    uniqueRecipes: getRecipes().length,
    avgNptTime: originalData.reduce((sum, item) => sum + (item.npt_time || 0), 0) / originalData.length,
    avgPressure: originalData.reduce((sum, item) => sum + (item.pressure || 0), 0) / originalData.length,
    avgTemperature: originalData.reduce((sum, item) => sum + (item.temperature || 0), 0) / originalData.length,
    avgTreadDepth: originalData.reduce((sum, item) => sum + (item.tread_depth || 0), 0) / originalData.length
  };
};

// Function to search for specific patterns in the data
export const searchData = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return originalData.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(lowerQuery)
    )
  );
};

const determineStatus = (data: TyreData): 'normal' | 'warning' | 'critical' => {
  if (data.pressure < 25 || data.pressure > 40 || 
      data.temperature > 50 || 
      data.tread_depth < 2) {
    return 'critical';
  } else if (data.pressure < 28 || data.pressure > 38 || 
             data.temperature > 40 || 
             data.tread_depth < 4) {
    return 'warning';
  }
  return 'normal';
}; 
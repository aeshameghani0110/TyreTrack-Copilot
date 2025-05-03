import React, { useState, useEffect } from 'react';
import { 
  useLiveTyreData, 
  getRecipes, 
  getAverageNptTime, 
  getRecipeStats,
  getOverallStats,
  searchData,
  initializeData
} from '../lib/simulatedDataService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TyreAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const liveData = useLiveTyreData();

  useEffect(() => {
    const loadData = async () => {
      await initializeData();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate AI response
    const response = generateAIResponse(input);
    const aiMessage: Message = { role: 'assistant', content: response };
    setMessages(prev => [...prev, aiMessage]);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Get overall statistics
    const overallStats = getOverallStats();
    if (!overallStats) {
      return "I'm still loading the data. Please try again in a moment.";
    }

    // Check for recipe-specific queries
    const recipes = getRecipes();
    const recipeMatch = recipes.find(recipe => 
      lowerQuestion.includes(recipe.toLowerCase())
    );

    if (recipeMatch) {
      const stats = getRecipeStats(recipeMatch);
      if (!stats) {
        return `I couldn't find any data for recipe ${recipeMatch}.`;
      }

      if (lowerQuestion.includes('npt') || lowerQuestion.includes('time')) {
        return `For recipe ${recipeMatch}:
- Average NPT time: ${stats.avgNptTime.toFixed(2)} minutes
- Minimum NPT time: ${stats.minNptTime.toFixed(2)} minutes
- Maximum NPT time: ${stats.maxNptTime.toFixed(2)} minutes
- Total samples analyzed: ${stats.count}`;
      }

      return `Statistics for recipe ${recipeMatch}:
- Average NPT time: ${stats.avgNptTime.toFixed(2)} minutes
- Average pressure: ${stats.avgPressure.toFixed(2)} psi
- Average temperature: ${stats.avgTemperature.toFixed(2)}°C
- Average tread depth: ${stats.avgTreadDepth.toFixed(2)} mm
- Total samples analyzed: ${stats.count}`;
    }

    // Handle specific data queries
    if (lowerQuestion.includes('total') || lowerQuestion.includes('how many records')) {
      return `Dataset Overview:
- Total records: ${overallStats.totalRecords}
- Unique recipes: ${overallStats.uniqueRecipes}
- Average NPT time across all recipes: ${overallStats.avgNptTime.toFixed(2)} minutes`;
    } else if (lowerQuestion.includes('average') || lowerQuestion.includes('mean')) {
      return `Overall Averages:
- NPT time: ${overallStats.avgNptTime.toFixed(2)} minutes
- Pressure: ${overallStats.avgPressure.toFixed(2)} psi
- Temperature: ${overallStats.avgTemperature.toFixed(2)}°C
- Tread depth: ${overallStats.avgTreadDepth.toFixed(2)} mm`;
    } else if (lowerQuestion.includes('recipe') || lowerQuestion.includes('recipes')) {
      return `Available recipes in the dataset:
${recipes.map(recipe => `- ${recipe}`).join('\n')}

You can ask about specific recipes by mentioning their name, for example:
"What is the average NPT time for recipe B168?"
"Show me statistics for recipe B168"`;
    } else if (lowerQuestion.includes('search') || lowerQuestion.includes('find')) {
      const searchTerm = question.replace(/search|find/i, '').trim();
      const results = searchData(searchTerm);
      if (results.length === 0) {
        return `No records found matching "${searchTerm}"`;
      }
      return `Found ${results.length} records matching "${searchTerm}":
${results.slice(0, 5).map(r => `- Recipe: ${r.recipe}, NPT Time: ${r.npt_time} minutes`).join('\n')}
${results.length > 5 ? `\n... and ${results.length - 5} more records` : ''}`;
    } else {
      return `I can help you analyze the tyre data. Here's what I can tell you about:
- Overall statistics and record counts
- Recipe-specific information
- Average values across the dataset
- Search for specific records
- Compare different recipes

Try asking questions like:
"What is the average NPT time for recipe B168?"
"How many total records are there?"
"What recipes are available?"
"Search for records with NPT time over 30 minutes"`;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tyre Data Analysis Assistant</h1>
      
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-100 rounded-lg">
          Loading and analyzing CSV data...
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </p>
            <p className="whitespace-pre-line">{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the tyre data (e.g., 'What is the average NPT time for recipe B168?')"
          className="flex-1 p-2 border rounded-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default TyreAI; 
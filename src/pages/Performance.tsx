
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle, 
  Calendar, 
  ChevronRight 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Performance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2025-Q2");
  
  // Performance metrics data
  const performanceData = {
    rating: 4.2,
    maxRating: 5,
    goalsCompleted: 7,
    goalsTotal: 10,
    skillsRatings: [
      { skill: "Communication", rating: 85 },
      { skill: "Technical Skills", rating: 92 },
      { skill: "Teamwork", rating: 88 },
      { skill: "Problem Solving", rating: 90 },
      { skill: "Leadership", rating: 78 }
    ],
    upcomingReviews: [
      { id: 1, title: "Mid-Year Review", date: "July 15, 2025", type: "Formal" },
      { id: 2, title: "Skills Assessment", date: "August 22, 2025", type: "Technical" }
    ],
    recentFeedback: [
      { 
        id: 1, 
        comment: "Great job on the client presentation. Your preparation and delivery were exceptional.",
        from: "Jennifer Parker, Project Manager",
        date: "May 5, 2025"
      },
      {
        id: 2,
        comment: "Your technical solution for the data migration issue saved us significant time. Well done.",
        from: "Mark Williams, CTO",
        date: "April 22, 2025"
      },
      {
        id: 3,
        comment: "I appreciate your help with onboarding the new team members. Your mentorship has been valuable.",
        from: "Emily Chen, Team Lead",
        date: "April 10, 2025"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
        <p className="text-muted-foreground">
          Track your performance metrics and feedback
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-lg font-medium">Overall Rating: {performanceData.rating}/{performanceData.maxRating}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Period:</span>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border rounded-md px-2 py-1"
          >
            <option value="2025-Q2">Q2 2025</option>
            <option value="2025-Q1">Q1 2025</option>
            <option value="2024-Q4">Q4 2024</option>
            <option value="2024-Q3">Q3 2024</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Goals Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.goalsCompleted}/{performanceData.goalsTotal}</div>
            <Progress 
              value={(performanceData.goalsCompleted / performanceData.goalsTotal) * 100} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-2">
              {performanceData.goalsTotal - performanceData.goalsCompleted} goals remaining this quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Time to Next Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 days</div>
            <p className="text-xs text-muted-foreground">Mid-year review on July 15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Skill Development</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8%</div>
            <p className="text-xs text-muted-foreground">Improvement from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="flex overflow-x-auto pb-1 md:pb-0">
          <TabsTrigger value="skills">Skills Ratings</TabsTrigger>
          <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
          <TabsTrigger value="reviews">Upcoming Reviews</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>
                Your current skills ratings based on manager and peer reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.skillsRatings.map((skill) => (
                  <div key={skill.skill} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.skill}</span>
                      <span className="font-medium">{skill.rating}%</span>
                    </div>
                    <Progress value={skill.rating} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback & Recognition</CardTitle>
              <CardDescription>
                Recent feedback from your managers and peers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-l-4 border-l-primary pl-4 py-1">
                    <p className="text-sm italic">"{feedback.comment}"</p>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{feedback.from}</span>
                      <span>{feedback.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Performance Reviews</CardTitle>
              <CardDescription>
                Schedule of your upcoming reviews and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {performanceData.upcomingReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{review.title}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full mr-2">{review.type}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>
                Your current quarter performance goals and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Complete Project X Implementation</h3>
                    <span className="text-green-600 text-sm font-medium">Completed</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Successfully implement and launch Project X with all features by end of quarter.</p>
                  <Progress value={100} className="h-1.5 mt-2" />
                </div>

                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Client Satisfaction Score</h3>
                    <span className="text-amber-600 text-sm font-medium">In Progress</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Achieve client satisfaction score of 4.5+ on all projects.</p>
                  <Progress value={80} className="h-1.5 mt-2" />
                </div>

                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Technical Certification</h3>
                    <span className="text-amber-600 text-sm font-medium">In Progress</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Complete Advanced Technical Certification program.</p>
                  <Progress value={60} className="h-1.5 mt-2" />
                </div>

                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Team Knowledge Sharing</h3>
                    <span className="text-red-600 text-sm font-medium">Not Started</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Conduct 2 knowledge sharing sessions with the team.</p>
                  <Progress value={0} className="h-1.5 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;

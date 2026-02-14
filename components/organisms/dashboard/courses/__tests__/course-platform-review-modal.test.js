import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CoursePlatformReviewModal, { REVIEW_TYPE } from '../course-platform-review-modal';

// Mock the API hook
const mockSubmitUserReview = jest.fn();
jest.mock('@/apis/studentReview', () => ({
  useSubmitUserReview: () => ({
    loading: false,
    error: null,
    submitUserReview: mockSubmitUserReview,
  }),
}));

describe('CoursePlatformReviewModal', () => {
  const defaultProps = {
    isOpen: true,
    onComplete: jest.fn(),
    onCancel: jest.fn(),
    needsCourseReview: true,
    needsPlatformReview: true,
    orderItemId: 1,
    tutorSubjectId: 123,
    courseName: 'English 101',
    tutorName: 'John Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitUserReview.mockResolvedValue({ success: true });
  });

  describe('rendering', () => {
    it('should not render when isOpen is false', () => {
      render(<CoursePlatformReviewModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('review-modal')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('review-modal')).toBeInTheDocument();
    });

    it('should show course review first when both reviews are needed', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('course-review-title')).toBeInTheDocument();
      expect(screen.getByText(/Rate Your Course/i)).toBeInTheDocument();
    });

    it('should show platform review when only platform review is needed', () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsCourseReview={false}
          needsPlatformReview={true}
        />
      );
      expect(screen.getByTestId('platform-review-title')).toBeInTheDocument();
      expect(screen.getByText(/Help us improve Lingo Foundry/i)).toBeInTheDocument();
    });

    it('should display course name and tutor name', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByText('English 101')).toBeInTheDocument();
      expect(screen.getByText(/with John Doe/i)).toBeInTheDocument();
    });
  });

  describe('star rating', () => {
    it('should have 5 stars for course review', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByTestId(`course-star-${i}`)).toBeInTheDocument();
      }
    });

    it('should update rating when star is clicked', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      const star4 = screen.getByTestId('course-star-4');
      await userEvent.click(star4);
      
      // Check that "Very Good" text appears
      expect(screen.getByText('Very Good')).toBeInTheDocument();
    });

    it('should show rating labels correctly', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      // Initial state
      expect(screen.getByText('Tap to rate')).toBeInTheDocument();
      
      // Click star 1
      await userEvent.click(screen.getByTestId('course-star-1'));
      expect(screen.getByText('Poor')).toBeInTheDocument();
      
      // Click star 2
      await userEvent.click(screen.getByTestId('course-star-2'));
      expect(screen.getByText('Fair')).toBeInTheDocument();
      
      // Click star 3
      await userEvent.click(screen.getByTestId('course-star-3'));
      expect(screen.getByText('Good')).toBeInTheDocument();
      
      // Click star 5
      await userEvent.click(screen.getByTestId('course-star-5'));
      expect(screen.getByText('Excellent!')).toBeInTheDocument();
    });
  });

  describe('description input', () => {
    it('should have description textarea', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('course-description-input')).toBeInTheDocument();
    });

    it('should update description when typed', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      const textarea = screen.getByTestId('course-description-input');
      await userEvent.type(textarea, 'Great course!');
      
      expect(textarea).toHaveValue('Great course!');
    });
  });

  describe('submit button', () => {
    it('should be disabled when no rating is selected', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('course-submit-button')).toBeDisabled();
    });

    it('should be disabled when rating is selected but description is empty', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      await userEvent.click(screen.getByTestId('course-star-4'));
      expect(screen.getByTestId('course-submit-button')).toBeDisabled();
    });

    it('should be enabled when both rating and description are provided', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      await userEvent.click(screen.getByTestId('course-star-4'));
      await userEvent.type(screen.getByTestId('course-description-input'), 'Great course!');
      expect(screen.getByTestId('course-submit-button')).not.toBeDisabled();
    });

    it('should show "Next" when platform review is also needed', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('course-submit-button')).toHaveTextContent('Next');
    });

    it('should show "Submit" when only course review is needed', () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsPlatformReview={false}
        />
      );
      expect(screen.getByTestId('course-submit-button')).toHaveTextContent('Submit');
    });
  });

  describe('cancel button', () => {
    it('should show cancel button on course review', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      expect(screen.getByTestId('course-cancel-button')).toBeInTheDocument();
    });

    it('should call onCancel when cancel button is clicked', async () => {
      const onCancel = jest.fn();
      render(<CoursePlatformReviewModal {...defaultProps} onCancel={onCancel} />);
      
      await userEvent.click(screen.getByTestId('course-cancel-button'));
      expect(onCancel).toHaveBeenCalled();
    });

    it('should show cancel button on platform review', () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsCourseReview={false}
        />
      );
      expect(screen.getByTestId('platform-cancel-button')).toBeInTheDocument();
    });
  });

  describe('course review submission', () => {
    it('should submit course review with correct data', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      await userEvent.click(screen.getByTestId('course-star-4'));
      await userEvent.type(screen.getByTestId('course-description-input'), 'Great course!');
      await userEvent.click(screen.getByTestId('course-submit-button'));
      
      expect(mockSubmitUserReview).toHaveBeenCalledWith({
        rating: 4,
        tutorSubjectId: 123,
        title: 'English 101 Review',
        description: 'Great course!',
        orderItemId: 1,
        authorType: 'STUDENT',
      });
    });

    it('should move to platform review after course review submission', async () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      await userEvent.click(screen.getByTestId('course-star-4'));
      await userEvent.type(screen.getByTestId('course-description-input'), 'Great course!');
      await userEvent.click(screen.getByTestId('course-submit-button'));
      
      await waitFor(() => {
        expect(screen.getByTestId('platform-review-title')).toBeInTheDocument();
      });
    });

    it('should call onComplete when only course review is needed', async () => {
      const onComplete = jest.fn();
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsPlatformReview={false}
          onComplete={onComplete}
        />
      );
      
      await userEvent.click(screen.getByTestId('course-star-5'));
      await userEvent.type(screen.getByTestId('course-description-input'), 'Amazing!');
      await userEvent.click(screen.getByTestId('course-submit-button'));
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('platform review', () => {
    it('should show platform review UI', async () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsCourseReview={false}
        />
      );
      
      expect(screen.getByTestId('platform-review-title')).toBeInTheDocument();
      expect(screen.getByTestId('platform-description-input')).toBeInTheDocument();
      expect(screen.getByTestId('platform-submit-button')).toBeInTheDocument();
    });

    it('should have 5 stars for platform review', async () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsCourseReview={false}
        />
      );
      
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByTestId(`platform-star-${i}`)).toBeInTheDocument();
      }
    });

    it('should submit platform review without tutorSubjectId', async () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsCourseReview={false}
        />
      );
      
      await userEvent.click(screen.getByTestId('platform-star-5'));
      await userEvent.type(screen.getByTestId('platform-description-input'), 'Love it!');
      await userEvent.click(screen.getByTestId('platform-submit-button'));
      
      expect(mockSubmitUserReview).toHaveBeenCalledWith({
        rating: 5,
        title: 'Platform Review',
        description: 'Love it!',
        orderItemId: 1,
        authorType: 'STUDENT',
      });
    });
  });

  describe('full flow', () => {
    it('should complete both reviews and call onComplete', async () => {
      const onComplete = jest.fn();
      render(<CoursePlatformReviewModal {...defaultProps} onComplete={onComplete} />);
      
      // Course review
      await userEvent.click(screen.getByTestId('course-star-4'));
      await userEvent.type(screen.getByTestId('course-description-input'), 'Great!');
      await userEvent.click(screen.getByTestId('course-submit-button'));
      
      // Wait for platform review to appear
      await waitFor(() => {
        expect(screen.getByTestId('platform-review-title')).toBeInTheDocument();
      });
      
      // Platform review
      await userEvent.click(screen.getByTestId('platform-star-5'));
      await userEvent.type(screen.getByTestId('platform-description-input'), 'Awesome!');
      await userEvent.click(screen.getByTestId('platform-submit-button'));
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith(true);
      });
      
      // Verify both API calls
      expect(mockSubmitUserReview).toHaveBeenCalledTimes(2);
    });
  });

  describe('progress indicator', () => {
    it('should show progress indicator when both reviews needed', () => {
      render(<CoursePlatformReviewModal {...defaultProps} />);
      
      // Should have 2 step indicators
      const stepIndicators = screen.getAllByText(/[12✓]/);
      expect(stepIndicators.length).toBeGreaterThanOrEqual(1);
    });

    it('should not show progress indicator when only one review needed', () => {
      render(
        <CoursePlatformReviewModal
          {...defaultProps}
          needsPlatformReview={false}
        />
      );
      
      // Check for absence of progress indicator structure
      const progressSteps = screen.queryAllByText(/^[12]$/);
      expect(progressSteps.length).toBe(0);
    });
  });

  describe('REVIEW_TYPE constants', () => {
    it('should export COURSE type', () => {
      expect(REVIEW_TYPE.COURSE).toBe('course');
    });

    it('should export PLATFORM type', () => {
      expect(REVIEW_TYPE.PLATFORM).toBe('platform');
    });
  });
});

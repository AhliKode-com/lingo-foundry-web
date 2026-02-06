import { renderHook, act, waitFor } from '@testing-library/react';
import { useSubmitUserReview } from '@/apis/studentReview';
import api from '@/lib/api';

// Mock the api module
jest.mock('@/lib/api', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe('useSubmitUserReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have loading as false initially', () => {
      const { result } = renderHook(() => useSubmitUserReview());
      expect(result.current.loading).toBe(false);
    });

    it('should have error as null initially', () => {
      const { result } = renderHook(() => useSubmitUserReview());
      expect(result.current.error).toBe(null);
    });

    it('should provide submitUserReview function', () => {
      const { result } = renderHook(() => useSubmitUserReview());
      expect(typeof result.current.submitUserReview).toBe('function');
    });
  });

  describe('submitUserReview - course review', () => {
    it('should submit course review with tutorSubjectId', async () => {
      const mockResponse = { data: { success: true } };
      api.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useSubmitUserReview());

      const reviewData = {
        rating: 4.5,
        tutorSubjectId: 123,
        description: 'Great course!',
        orderItemId: 1,
      };

      let response;
      await act(async () => {
        response = await result.current.submitUserReview(reviewData);
      });

      expect(api.post).toHaveBeenCalledWith(
        '/student/user-review',
        reviewData,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(response).toEqual(mockResponse.data);
    });

    it('should set loading to true during submission', async () => {
      let resolvePromise;
      api.post.mockImplementation(() => new Promise((resolve) => {
        resolvePromise = resolve;
      }));

      const { result } = renderHook(() => useSubmitUserReview());

      act(() => {
        result.current.submitUserReview({
          rating: 4,
          tutorSubjectId: 123,
          description: 'Test',
          orderItemId: 1,
        });
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolvePromise({ data: { success: true } });
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('submitUserReview - platform review', () => {
    it('should submit platform review without tutorSubjectId', async () => {
      const mockResponse = { data: { success: true } };
      api.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useSubmitUserReview());

      const reviewData = {
        rating: 5,
        description: 'Love the platform!',
        orderItemId: 1,
      };

      await act(async () => {
        await result.current.submitUserReview(reviewData);
      });

      expect(api.post).toHaveBeenCalledWith(
        '/student/user-review',
        reviewData,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should set error on API failure', async () => {
      const errorMessage = 'Failed to submit review';
      api.post.mockRejectedValueOnce({
        response: { data: { message: errorMessage } },
      });

      const { result } = renderHook(() => useSubmitUserReview());

      await act(async () => {
        try {
          await result.current.submitUserReview({
            rating: 4,
            description: 'Test',
            orderItemId: 1,
          });
        } catch (err) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.loading).toBe(false);
    });

    it('should use default error message when API error has no message', async () => {
      api.post.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useSubmitUserReview());

      await act(async () => {
        try {
          await result.current.submitUserReview({
            rating: 4,
            description: 'Test',
            orderItemId: 1,
          });
        } catch (err) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Failed to submit review');
    });

    it('should clear error on new submission attempt', async () => {
      // First call fails
      api.post.mockRejectedValueOnce({
        response: { data: { message: 'First error' } },
      });

      const { result } = renderHook(() => useSubmitUserReview());

      await act(async () => {
        try {
          await result.current.submitUserReview({
            rating: 4,
            description: 'Test',
            orderItemId: 1,
          });
        } catch (err) {
          // Expected
        }
      });

      expect(result.current.error).toBe('First error');

      // Second call succeeds
      api.post.mockResolvedValueOnce({ data: { success: true } });

      await act(async () => {
        await result.current.submitUserReview({
          rating: 5,
          description: 'Test',
          orderItemId: 1,
        });
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe('rating validation', () => {
    it('should accept integer ratings', async () => {
      api.post.mockResolvedValueOnce({ data: { success: true } });

      const { result } = renderHook(() => useSubmitUserReview());

      await act(async () => {
        await result.current.submitUserReview({
          rating: 5,
          description: 'Perfect!',
          orderItemId: 1,
        });
      });

      expect(api.post).toHaveBeenCalledWith(
        '/student/user-review',
        expect.objectContaining({ rating: 5 }),
        expect.any(Object)
      );
    });

    it('should accept decimal ratings', async () => {
      api.post.mockResolvedValueOnce({ data: { success: true } });

      const { result } = renderHook(() => useSubmitUserReview());

      await act(async () => {
        await result.current.submitUserReview({
          rating: 3.5,
          description: 'Good',
          orderItemId: 1,
        });
      });

      expect(api.post).toHaveBeenCalledWith(
        '/student/user-review',
        expect.objectContaining({ rating: 3.5 }),
        expect.any(Object)
      );
    });
  });
});
